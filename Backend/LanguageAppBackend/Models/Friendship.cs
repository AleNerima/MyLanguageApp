using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LanguageAppBackend.Models
{
    public class Friendship
    {
        [Key]
        public int FriendshipId { get; set; }

        [Required]
        public int UserId1 { get; set; }  // Utente che ha inviato la richiesta
        [Required]
        public int UserId2 { get; set; }  // Utente che riceve la richiesta

        // Aggiungi lo stato per tracciare la richiesta di amicizia
        [Required]
        public FriendshipStatus Status { get; set; } = FriendshipStatus.Pending;

        public DateTime StartedAt { get; set; } = DateTime.Now;

        // Proprietà per tracciare chi ha inviato la richiesta
        public int RequesterId { get; set; }  // Indica chi ha inviato la richiesta (UserId1 o UserId2)

        [JsonIgnore]
        [ForeignKey(nameof(UserId1))]
        public User User1 { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(UserId2))]
        public User User2 { get; set; }
    }

    // Enum per lo stato dell'amicizia
    public enum FriendshipStatus
    {
        Pending = 0,   // Richiesta in attesa
        Accepted = 1,  // Amicizia accettata
        Rejected = 2   // Richiesta rifiutata
    }
}

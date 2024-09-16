namespace LanguageAppBackend.Models
{
    public class FriendshipViewModel
    {
        public int UserId1 { get; set; }
        public int UserId2 { get; set; }

        //il campo per mostrare lo stato dell'amicizia
        public FriendshipStatus Status { get; set; }

        //il campo per sapere chi ha inviato la richiesta
        public int RequesterId { get; set; }
    }
}

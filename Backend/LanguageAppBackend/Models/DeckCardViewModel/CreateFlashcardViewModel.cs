namespace LanguageAppBackend.Models.DeckCardViewModel
{
    public class CreateFlashcardViewModel
    {
        public string Term { get; set; }
        public string Definition { get; set; }
        public byte DifficultyLevel { get; set; }
        public int DeckId { get; set; }
        public int UserId { get; set; }
    }

}

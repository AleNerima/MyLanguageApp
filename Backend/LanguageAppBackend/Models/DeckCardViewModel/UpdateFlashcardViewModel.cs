namespace LanguageAppBackend.Models.DeckCardViewModel
{
    public class UpdateFlashcardViewModel
    {
        public int CardId { get; set; }
        public string Term { get; set; }
        public string Definition { get; set; }
        public byte DifficultyLevel { get; set; }
    }

}

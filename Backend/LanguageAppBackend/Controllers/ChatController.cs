using Microsoft.AspNetCore.Mvc;
using LanguageAppBackend.Models;
using LanguageAppBackend.Services.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    [HttpGet("byUser/{userId}")]
    public async Task<ActionResult<IEnumerable<Chat>>> GetChatsByUserId(int userId)
    {
        var chats = await _chatService.GetChatsByUserIdAsync(userId);
        return Ok(chats);
    }

    [HttpGet("byId/{chatId}")]
    public async Task<ActionResult<Chat>> GetChatById(int chatId)
    {
        var chat = await _chatService.GetChatByIdAsync(chatId);
        if (chat == null)
            return NotFound();
        return Ok(chat);
    }


    [HttpPost]
    public async Task<ActionResult> CreateChat([FromBody] ChatViewModel chatViewModel)
    {
        if (ModelState.IsValid)
        {
            var chat = new Chat
            {
                UserId1 = chatViewModel.UserId1,
                UserId2 = chatViewModel.UserId2,
                Message = chatViewModel.Message
            };

            if (await _chatService.CreateChatAsync(chat))
                return CreatedAtAction(nameof(GetChatById), new { chatId = chat.ChatId }, chat);

            return BadRequest();
        }

        return BadRequest(ModelState);
    }

    [HttpDelete("{chatId}")]
    public async Task<ActionResult> DeleteChat(int chatId)
    {
        if (await _chatService.DeleteChatAsync(chatId))
            return NoContent();

        return NotFound();
    }
}

using Microsoft.AspNetCore.Mvc;
using LanguageAppBackend.Services;
using Microsoft.EntityFrameworkCore;

namespace LanguageAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateChat(int userId1, int userId2)
        {
            var chat = await _chatService.CreateChatAsync(userId1, userId2);
            return Ok(chat);
        }

        [HttpGet("messages/{chatId}")]
        public async Task<IActionResult> GetMessages(int chatId)
        {
            var messages = await _chatService.GetMessagesAsync(chatId);
            return Ok(messages);
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMessage(int chatId, int senderId, int receiverId, [FromBody] string messageText)
        {
            await _chatService.SendMessageAsync(chatId, senderId, receiverId, messageText);
            return Ok();
        }

        [HttpPost("update-status")]
        public async Task<IActionResult> UpdateMessageStatus(int messageId, int userId, [FromBody] bool isRead)
        {
            await _chatService.UpdateMessageStatusAsync(messageId, userId, isRead);
            return Ok();
        }

        [HttpGet("details/{chatId}")]
        public async Task<IActionResult> GetChatDetails(int chatId)
        {
            var chatDetails = await _chatService.GetChatDetailsAsync(chatId);
            if (chatDetails == null)
            {
                return NotFound();
            }
            return Ok(chatDetails);
        }

        [HttpGet("chat-id")]
        public async Task<IActionResult> GetChatId([FromQuery] int userId1, [FromQuery] int userId2)
        {
            var chatId = await _chatService.GetChatIdAsync(userId1, userId2);
            return Ok(chatId);
        }

        [HttpGet("unread-count/{userId}")]
        public async Task<IActionResult> GetUnreadMessageCount(int userId)
        {
            var unreadCounts = await _chatService.GetUnreadMessageCountsAsync(userId);
            return Ok(unreadCounts);
        }




    }

}

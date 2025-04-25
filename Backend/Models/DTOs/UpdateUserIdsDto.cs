using System.Collections.Generic;

namespace Movie_Ticket.Models
{
    public class UpdateUserIdsDto
    {
        public List<string> BookmarkIds { get; set; }
        public List<string> WatchlistIds { get; set; }
        public List<string> OrderIds { get; set; }
    }
}

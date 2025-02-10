namespace BookApp.BLL.Models
{
    public class PaginatedData<T>
    {
        public int LastPage {  get; set; }
        public IEnumerable<T> Items {  get; set; }
    }
}

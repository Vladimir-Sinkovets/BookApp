namespace BookApp.BLL.Models
{
    public class PaginatedData<T>
    {
        public int LastPage {  get; set; }
        public T Items {  get; set; }
    }
}

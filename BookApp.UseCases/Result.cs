namespace BookApp.UseCases
{
    public class Result<T> where T : class
    {
        public Status Status { get; set; }
        public string Message { get; set; }
        public T? Data { get; set; }

        public static Result<T> Create(Status status, string message, T data = null)
        {
            return new Result<T>
            {
                Status = status,
                Message = message,
                Data = data,
            };
        }
    }
}

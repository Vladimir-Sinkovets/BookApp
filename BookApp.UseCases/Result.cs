namespace BookApp.UseCases
{
    public class Result<T> where T : class
    {
        public Status Status { get; set; }
        public bool IsSucceeded { get; set; } = false;
        public string Message { get; set; }
        public T? Data { get; set; }

        public static Result<T> Create(Status status, string message, T data = null)
        {
            var isSucceeded = status == Status.Success;

            return new Result<T>
            {
                Status = status,
                IsSucceeded = isSucceeded,
                Message = message,
                Data = data,
            };
        }
    }
}

using Digitalizer.DeliveryPlatform.Common.Results;

namespace Digitalizer.DeliveryPlatform.Common.Exceptions;
public sealed class DeliveryPlatformException : Exception

{
    public DeliveryPlatformException() : base("Application exception") { }

    public DeliveryPlatformException(string message) : base(message) { }

    public DeliveryPlatformException(string message, Exception innerException) : base(message, innerException) { }

    public DeliveryPlatformException(string requestName, ErrorResult? error = default, Exception? innerException = default) : base("Application exception", innerException)
    {
        RequestName = requestName;
        Error = error;
    }

    public string RequestName { get; }

    public ErrorResult? Error { get; }
}

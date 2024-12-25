#pragma warning disable CA1716
namespace Digitalizer.DeliveryPlatform.Common.Results;
#pragma warning restore CA1716
public record ErrorResult(string Code, string Description, ErrorType Type)
{
    public static readonly ErrorResult None = new(string.Empty, string.Empty, ErrorType.Failure);
    public static readonly ErrorResult NullValue = new(
        "General.Null",
        "Null value was provided",
        ErrorType.Failure);

    public static ErrorResult Failure(string code, string description) =>
        new(code, description, ErrorType.Failure);

    public static ErrorResult NotFound(string code, string description) =>
        new(code, description, ErrorType.NotFound);

    public static ErrorResult Problem(string code, string description) =>
        new(code, description, ErrorType.Problem);

    public static ErrorResult Conflict(string code, string description) =>
        new(code, description, ErrorType.Conflict);
}

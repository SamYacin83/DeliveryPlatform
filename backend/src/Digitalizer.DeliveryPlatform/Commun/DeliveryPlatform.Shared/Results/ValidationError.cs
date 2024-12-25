namespace Digitalizer.DeliveryPlatform.Common.Results;
public sealed record ValidationError(IReadOnlyList<ErrorResult> Errors) : ErrorResult("General.Validation",
    "One or more validation errors occurred",
    ErrorType.Validation)
{
    public static ValidationError FromResults(IEnumerable<Result> results) =>
        new(results.Where(r => r.IsFailure).Select(r => r.Error).ToList().AsReadOnly());
}


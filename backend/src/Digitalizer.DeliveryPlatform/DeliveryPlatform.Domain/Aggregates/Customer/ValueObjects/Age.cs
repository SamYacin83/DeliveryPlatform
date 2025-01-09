using Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.Exceptions;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Customer.ValueObjects;
public record Age(DateTime BirthDate)
{
    public int Value { get; } = CalculateAge(BirthDate, DateTime.Now);

    private static int CalculateAge(DateTime birthDate, DateTime currentDate)
    {
        var age = currentDate.Year - birthDate.Year;
        if (birthDate.Date > currentDate.AddYears(-age)) age--;
        if (age < CustomerConstants.MinAllowedAge)
        {
            throw new InvalidCustomerAgeDomainException();
        }
        return age;
    }

}

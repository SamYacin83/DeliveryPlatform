using Digitalizer.DeliveryPlatform.Domain.Commun;
using System.Text.RegularExpressions;
using Digitalizer.DeliveryPlatform.Domain.Exceptions;

namespace Digitalizer.DeliveryPlatform.Domain.ValueObjects;
public class PhoneNumber : ValueObject
{
    public string Value { get; private set; }

    private PhoneNumber(string value)
    {
        Value = value;
    }

    public static PhoneNumber Create(string value)
    {
        if (string.IsNullOrEmpty(value))
            throw new ArgumentNullException(nameof(value));

        if (!IsValidPhoneNumber(value))
            throw new InvalidPhoneNumberException(value);

        return new PhoneNumber(value);
    }

    private static bool IsValidPhoneNumber(string phoneNumber)
    {
        return Regex.IsMatch(phoneNumber, @"^\+?[1-9]\d{1,14}$");
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }
}

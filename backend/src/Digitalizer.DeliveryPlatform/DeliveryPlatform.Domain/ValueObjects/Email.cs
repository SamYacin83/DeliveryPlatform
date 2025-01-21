using Digitalizer.DeliveryPlatform.Domain.Commun;
using Digitalizer.DeliveryPlatform.Domain.Exceptions;

namespace Digitalizer.DeliveryPlatform.Domain.ValueObjects;
public class Email : ValueObject
{
    public string Value { get; private set; }
    protected Email() { } // Required for EF Core

    private Email(string value)
    {
        Value = value;
    }

    public static Email Create(string value)
    {
        if (string.IsNullOrEmpty(value))
            throw new ArgumentNullException(nameof(value));

        if (!IsValidEmail(value))
            throw new InvalidEmailException(value);

        return new Email(value);
    }

    private static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch (FormatException)
        {
            return false;
        }
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }
}

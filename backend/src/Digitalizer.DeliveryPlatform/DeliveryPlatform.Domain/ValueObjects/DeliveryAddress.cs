using Digitalizer.DeliveryPlatform.Domain.Commun;

namespace Digitalizer.DeliveryPlatform.Domain.ValueObjects;
public class DeliveryAddress : ValueObject
{
    public string Street { get; private set; }
    public string City { get; private set; }
    public string PostalCode { get; private set; }
    public string Country { get; private set; }

    public DeliveryAddress() { }

    private DeliveryAddress(string street, string city, string postalCode, string country)
    {
        Street = street;
        City = city;
        PostalCode = postalCode;
        Country = country;
    }

    public static DeliveryAddress Create(string street, string city, string postalCode, string country)
    {
        if (string.IsNullOrEmpty(street))
            throw new ArgumentNullException(nameof(street));

        if (string.IsNullOrEmpty(city))
            throw new ArgumentNullException(nameof(city));

        if (string.IsNullOrEmpty(postalCode))
            throw new ArgumentNullException(nameof(postalCode));

        if (string.IsNullOrEmpty(country))
            throw new ArgumentNullException(nameof(country));

        return new DeliveryAddress(street, city, postalCode, country);
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Street;
        yield return City;
        yield return PostalCode;
        yield return Country;
    }
}
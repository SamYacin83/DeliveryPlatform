using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.ValueObjects;

public class Location
{
    public double Latitude { get; private set; }

    public double Longitude { get; private set; }

    public Location(double latitude, double longitude)
    {
        if (latitude < -90 || latitude > 90)
            throw new InvalidLocationException(latitude, longitude);

        if (longitude < -180 || longitude > 180)
            throw new InvalidLocationException(latitude, longitude);

        Latitude = latitude;
        Longitude = longitude;
    }
    public Location() { }
    public static Location Default => new Location(0, 0);
    public override bool Equals(object? obj)
    {
        if (obj is Location other)
        {
            return Latitude == other.Latitude && Longitude == other.Longitude;
        }
        return false;
    }

    public override int GetHashCode() => (Latitude, Longitude).GetHashCode();

    public override string ToString() => $"Latitude: {Latitude}, Longitude: {Longitude}";
}


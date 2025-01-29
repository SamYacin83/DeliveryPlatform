﻿namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson;
public class DeliveryPersonDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public AddressDto Address { get; set; }
}




using FluentValidation;

namespace Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.AddDeliveryPerson;

//public class GetByIdDeliveryPersonCommandValidator : AbstractValidator<AddDeliveryPersonCommand>
//{
//    public GetByIdDeliveryPersonCommandValidator()
//    {
//        RuleFor(x => x.FirstName)
//            .NotEmpty().WithMessage("Le prénom est requis.")
//            .MaximumLength(100).WithMessage("Le prénom ne peut pas dépasser 100 caractères.");

//        RuleFor(x => x.LastName)
//            .NotEmpty().WithMessage("Le nom de famille est requis.")
//            .MaximumLength(100).WithMessage("Le nom de famille ne peut pas dépasser 100 caractères.");

//        RuleFor(x => x.PhoneNumber)
//            .NotEmpty().WithMessage("Le numéro de téléphone est requis.")
//            .Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("Format de numéro de téléphone invalide.");

//        RuleFor(x => x.Email)
//            .NotEmpty().WithMessage("L'adresse e-mail est requise.")
//            .EmailAddress().WithMessage("Format d'adresse e-mail invalide.");

//        RuleFor(x => x.Street)
//            .NotEmpty().WithMessage("La rue est requise.")
//            .MaximumLength(200).WithMessage("Le nom de la rue ne peut pas dépasser 200 caractères.");

//        RuleFor(x => x.City)
//            .NotEmpty().WithMessage("La ville est requise.")
//            .MaximumLength(100).WithMessage("Le nom de la ville ne peut pas dépasser 100 caractères.");

//        RuleFor(x => x.PostalCode)
//            .NotEmpty().WithMessage("Le code postal est requis.")
//            .MaximumLength(20).WithMessage("Le code postal ne peut pas dépasser 20 caractères.");

//        RuleFor(x => x.Country)
//            .NotEmpty().WithMessage("Le pays est requis.")
//            .MaximumLength(100).WithMessage("Le nom du pays ne peut pas dépasser 100 caractères.");
//    }
//}

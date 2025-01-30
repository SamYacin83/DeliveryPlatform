using Digitalizer.DeliveryPlatform.Application.Features.Auth.Logout;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Auth;

public class LogoutEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/Logout", LogoutAsync)
           .WithName("Logout")
           .WithTags(Tags.Identity)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Logout";
               operation.Description = "Logout the user";
               return operation;
           }).RequireAuthorization();
    }

    private static async Task<IResult> LogoutAsync(IMediator mediator)
    {
        var query = new LogoutQuery();
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.NoContent, ApiResults.Problem);
    }
}



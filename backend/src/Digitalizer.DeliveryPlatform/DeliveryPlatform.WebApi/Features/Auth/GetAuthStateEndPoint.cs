using Digitalizer.DeliveryPlatform.Application.Features.Auth.GetAuthStatus;
using Digitalizer.DeliveryPlatform.Application.Features.Auth.GetUserInfo;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Auth;

public class GetAuthStateEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/authStatus", GetAuthStatusAsync)
           .WithName("GetAuthStatus")
           .WithTags(Tags.Identity)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Get authentication status";
               operation.Description = "Returns the authentication status of the user";
               return operation;
           });
    }

    private static async Task<IResult> GetAuthStatusAsync(IMediator mediator)
    {
        var query = new GetAuthStatusQuery();
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}

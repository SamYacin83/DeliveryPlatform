using Digitalizer.DeliveryPlatform.Application.Features.Auth.GetUserInfo;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Auth;

public class GetUserInfoEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/GetUserInfo", GetUserInfoAsync)
           .WithName("GetUserInfo")
           .WithTags(Tags.Identity)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Get all customer details";
               operation.Description = "Returns details of all customers, including their information";
               return operation;
           }).RequireAuthorization();
    }

    private static async Task<IResult> GetUserInfoAsync(IMediator mediator)
    {
        var query = new GetUserInfoQuery();
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}

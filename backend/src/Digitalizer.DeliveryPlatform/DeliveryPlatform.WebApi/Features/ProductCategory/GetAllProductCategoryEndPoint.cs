using Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.GetAllProductCategory;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.ProductCategory;

internal sealed class GetAllProductCategoryEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/GetAllCatProduct", GetAllProductCatAsync)
           .WithName("GetAllProductCatAsync")
           .WithTags(Tags.ProductCategory)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Get all product details";
               operation.Description = "Returns details of all products, including their items";
               return operation;
           });
    }

    private static async Task<IResult> GetAllProductCatAsync(IMediator mediator)
    {
        var query = new GetAllProductCategoryQuery();
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}

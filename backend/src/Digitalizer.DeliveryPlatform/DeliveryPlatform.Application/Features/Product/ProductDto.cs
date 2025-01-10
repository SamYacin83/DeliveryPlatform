namespace Digitalizer.DeliveryPlatform.Application.Features.Product;
public class ProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal PriceAmount { get; set; }
    public string Currency { get; set; }
    public Uri PictureUrl { get; set; } 
    public Guid CategoryId { get; set; }
    public int StockQuantity { get; set; }
    public bool IsAvailable { get; set; }
}

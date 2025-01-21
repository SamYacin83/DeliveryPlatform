using Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.Exceptions;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.Entities;
using Digitalizer.DeliveryPlatform.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Digitalizer.DeliveryPlatform.Domain.Aggregates.Delivery.ValueObjects;
public class Document
{
    public string FileName { get; }
    public Uri FileUrl { get; private set; } // URI valide du fichier
    public long FileSize { get; }
    public DocumentType Type { get; private set; } 
    public Guid DeliveryPersonId { get; private set; } 
    public DeliveryPerson DeliveryPerson { get; private set; }

    private Document() { }

    public Document(string name, Uri fileUrl, DocumentType type, Guid deliveryPersonId)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentNullException(nameof(name), "Le nom du fichier ne peut pas être vide ou null.");

        if (fileUrl == null || !fileUrl.IsAbsoluteUri)
            throw new ArgumentException("L'URL du fichier doit être une URI absolue et valide.", nameof(fileUrl));

        FileName = name;
        FileUrl = fileUrl;
        Type = type;
        DeliveryPersonId = deliveryPersonId;
    }

    public void UpdateFile(Uri newFileUrl)
    {
        if (newFileUrl == null || !newFileUrl.IsAbsoluteUri)
            throw new ArgumentException("La nouvelle URL du fichier doit être une URI absolue et valide.", nameof(newFileUrl));

        FileUrl = newFileUrl;
    }
}


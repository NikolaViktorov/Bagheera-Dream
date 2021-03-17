namespace server.Models.Contracts
{
    using server.Models.Cats;
    using System.Collections.Generic;

    public interface IParent
    {
        ICollection<Cat> Children { get; set; }
    }
}

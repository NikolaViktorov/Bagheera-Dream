namespace server.Models.Cats
{
    using System.Collections.Generic;

    using server.Models.Contracts;

    public class Male : Cat, IParent
    {
        public Male()
        {
            this.Children = new HashSet<Cat>();
        }

        public virtual ICollection<Cat> Children { get; set; }
    }
}

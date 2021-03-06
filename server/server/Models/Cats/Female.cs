namespace server.Models.Cats
{
    using System.Collections.Generic;

    using server.Models.Contracts;

    public class Female : Cat, IParent
    {
        public Female()
        {
            this.Children = new HashSet<Cat>();
        }

        public virtual ICollection<Cat> Children { get; set; }
    }
}

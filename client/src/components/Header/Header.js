const Header = () => {
    return (
        <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand" asp-area="" asp-controller="Cats" asp-action="Home">
                    <img class="logo-image" src="~/images/small-logo.png" />
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collaps navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" asp-area="" asp-controller="Cats" asp-action="Home">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" asp-area="" asp-controller="Settings" asp-action="Index">Settings</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    );
};


export default Header;
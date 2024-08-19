const nav_template = `
    <ul class="nav justify-content-between align-items-center bg-white border-bottom">
        <li class="nav-item mx-3">
            <img src="./Style/Images/FPT-logo.png" alt="Logo" class="nav-logo">
        </li>
        <div class = "d-flex">
            <li class="nav-item">
                <router-link class="nav-link align-center" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link align-center" to="/project">Projects</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link align-center pe-0" to="/login"><button type="button" class="btn btn-primary">Login</button></router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link align-center me-3" to="/register"><button type="button" class="btn btn-secondary">Register</button></router-link>
            </li>
        </div>
    </ul>
`;

export default nav_template;

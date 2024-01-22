<template>
    <div id="layout" class="grid">
        <header>
            <h1>Blight anoint tools</h1>
        </header>
        <nav>
            <ul class="grid">
                <li>
                    <nuxt-link to="/">Match item</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/oil-matching/">Match oil</nuxt-link>
                </li>
            </ul>
        </nav>
        <div id="page">
            <slot></slot>
        </div>
    </div>    
</template>
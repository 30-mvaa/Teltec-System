from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse


def home(request):
    return HttpResponse("""
        
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Bienvenido a Teltec Net API</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #0c1120; /* fondo oscuro similar al de la imagen */
                    color: #d1d5db; /* texto gris claro */
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                    justify-content: center;
                }

                h1 {
                    font-size: 42px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                /* Colores como en el logo: blanco, azul y verde */
                .tel {
                    color: white;
                }

                .tec {
                    color: #2f59ff; /* azul */
                }

                .net {
                    color: #00ff66; /* verde brillante */
                }

                .subtitulo {
                    font-size: 18px;
                    color: #a0aec0;
                    margin-bottom: 30px;
                }

                .container {
                    text-align: center;
                }

                ul {
                    list-style: none;
                    padding: 0;
                    margin-top: 10px;
                }

                li {
                    margin: 10px 0;
                }

                a {
                    text-decoration: none;
                    font-size: 18px;
                    color: white;
                    background-color: #2f2d84;
                    padding: 10px 20px;
                    border-radius: 10px;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                    display: inline-block;
                }

                a:hover {
                    background-color: #00ff66;
                    color: #0c1120;
                    transform: scale(1.05);
                }
            </style>
        </head>
        <body>

            <div class="container">
                <h1>
                    <span class="tel">Tel</span><span class="tec">Tec</span><span class="net"> Net</span>
                </h1>
                <p class="subtitulo">Sistema de Administración</p>

                <ul>
                    <li><a href='/admin/'>Panel de Administración</a></li>
                    <li><a href='/api/clientes/clientes/'>API de Clientes</a></li>
                    <li><a href='/api/facturacion/pagos/'>API de Pagos</a></li>
                </ul>
            </div>

        </body>
        </html>
    """

    )




from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def home(request):
    return HttpResponse("""
    <h1 style="text-align: center; margin-top: 50px;">Bienvenido a Teltec Net API</h1>
    <div style="text-align: center; margin-top: 20px;">
        <p>Accede a:</p>
        <ul style="list-style: none; padding: 0;">
            <li><a href='/admin/'>Panel de Administración</a></li>
            <li><a href='/api/clientes/clientes/'>API de Clientes</a></li>
            <li><a href='/api/facturacion/pagos/'>API de Pagos</a></li>
        </ul>
    </div>
    """)

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/clientes/', include('clientes.urls')),
    path('api/facturacion/', include('facturacion.urls')),
    path('api/dashboard/', include('dashboard.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    



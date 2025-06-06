using Core.Feature;
using Microsoft.Extensions.DependencyInjection;
using Uj3.Services;

namespace Uj3;

public class Uj3Feature : IFeature
{

    void IFeature.ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<IUj3Service, Uj3Service>();
    }
}
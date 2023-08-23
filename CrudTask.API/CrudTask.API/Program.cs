using CrudTask.API.Data;
using CrudTask.API.Interface;
using CrudTask.API.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CustomerDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnection"));
    option.EnableSensitiveDataLogging();
    //option.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

//for connection between backend and frontend
builder.Services.AddCors(option => {
    option.AddPolicy("MyPolicy", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

builder.Services.AddScoped<ICustomer, CustomerRepository>();
//builder.Services.AddScoped<ICustomerType, CustomerTypeRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("MyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();

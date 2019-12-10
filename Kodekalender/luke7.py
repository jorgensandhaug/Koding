x = 7
for dydx in range(2, 27644437):
    if((dydx*x)%27644437 == 1):
        kode = (5897*dydx)%27644437
        break
print(kode)
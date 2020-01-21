# summen = 0 
# for n in range(1, 10000):
#     if ((n+4)*(n+5) % (n*(n+1))) == 0:
#         print(n)
#         summen += n
# print(summen)

antallfaktorer = 0

for x in range(1, 10):
    for y in range(1, 10):
        for z in range(1, 10):
            if x**4 * y * z < 1000:
                print(x, y, z, x**4*y*z)




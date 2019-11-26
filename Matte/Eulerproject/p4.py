biggest = 0
    
    
for i in range(100, 1000):
    for k in range(100, 1000):
        if(k*i == int(str(k*i)[::-1]x)):
            if(k*i > biggest):
                biggest = k*i
print(biggest)
        
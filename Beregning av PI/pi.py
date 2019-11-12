import math
timeSteps = 1000
digits = 10
count = 0
a = [300, -2/timeSteps, math.pow(100, digits-1)]
b = [100, 0, 1]

def collide(r1, r2):
    old1 = r1[1]
    old2 = r2[1]
    r1[1] = (2*r2[2]*old2 + old1*(r1[2]-r2[2]))/(r1[2]+r2[2])
    r2[1] = (2*r1[2]*old1 + old2*(r2[2]-r1[2]))/(r1[2]+r2[2])

def update():
    global count, a, b
    
    a[0] += a[1]
    b[0] += b[1]
    if(a[0] <= b[0]+10):
        collide(a, b)
        count = count + 1
        
    if(b[0] <= 0):
        b[1] = -b[1]
        count = count + 1
k = 0
while True:
    for i in range(timeSteps):
        update()
        if(k%1000000== 0):
            print(count)
        k+=1
        




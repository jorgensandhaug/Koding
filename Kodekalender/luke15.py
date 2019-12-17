import math
def dot(a, b):
    return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
def cross(a, b):
    return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]
def partialVolume(A, B, C):
    a = [B[0]-A[0], B[1]-A[1], B[2]-A[2]]
    b = [C[0]-A[0], C[1]-A[1], C[2]-A[2]]
    c = [-A[0], -A[1], -A[2]]
    return dot(cross(a, b), c)/6

arr = []
volum = 0
with open("MODEL.csv", "r") as fil:
    for line in fil:
        arr.append(line.strip().split(",")[:3])
        arr.append(line.strip().split(",")[3:6])
        arr.append(line.strip().split(",")[6:])
for i in arr:
    i[0] = float(i[0])
    i[1] = float(i[1])
    i[2] = float(i[2])
for i in range(0, len(arr), 3):
    volum += partialVolume(arr[i], arr[i+1], arr[i+2])
print(round(abs(volum*0.001), 3))


    

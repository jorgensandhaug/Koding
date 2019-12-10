kart = list()
for i in range(1000):
    kart.append(list())
    for k in range(1000):
        kart[i].append(1)
time = 0
currentPos = [0, 0]
def move(x, y):
    global time
    global currentPos
    if currentPos[0] < x:
        while currentPos[0] < x:
            kart[currentPos[1]][currentPos[0]]+=1
            currentPos[0]+=1
            time+=kart[currentPos[1]][currentPos[0]]
            # print(kart[currentPos[1]][currentPos[0]], "første")
    else:
        while currentPos[0] > x:
            kart[currentPos[1]][currentPos[0]]+=1
            currentPos[0]-=1
            time+=kart[currentPos[1]][currentPos[0]]
            # print(kart[currentPos[1]][currentPos[0]], "andre")
    if currentPos[1] < y:
        while currentPos[1] < y:
            kart[currentPos[1]][currentPos[0]]+=1
            currentPos[1]+=1
            time+=kart[currentPos[1]][currentPos[0]]
            # print(kart[currentPos[1]][currentPos[0]], "tredje")
    else:
        while currentPos[1] > y:
            kart[currentPos[1]][currentPos[0]]+=1
            currentPos[1]-=1
            time+=kart[currentPos[1]][currentPos[0]]
            # print(kart[currentPos[1]][currentPos[0]], "fjerde")
    # print(kart[currentPos[1]][currentPos[0]])

# test = [[1, 3], [1, 0], [3, 2]]
# for item in test:
#     move(item[0], item[1])
with open("luke4.csv", "r") as fil:
    for line in fil:
        coo = line.strip().split(",")
        x = int(coo[0])
        y = int(coo[1])
        move(x, y)
print(time)
# move(1, 3)
# print(time)
# print(currentPos)
# print(kart[0][0], kart[0][1], kart[1][1], kart[2][1])
# move(1, 0)
# print(time)
# print(currentPos)
# print(kart[0][0], kart[0][1], kart[1][1], kart[2][1], kart[3][1])
# move(3, 2)
# print(time)
# print(currentPos)
# print(kart[0][0], kart[0][1], kart[1][1], kart[2][1], kart[3][1])



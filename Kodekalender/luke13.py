import json

fil = open("MAZE.txt", "r")
maze = json.loads(fil.read())


def nedover(y,x):
    if maze[y][x]["bottom"] or maze[y+1][x]["top"]:
        return False
    return True
def hoyre(y,x):
    if maze[y][x]["right"] or maze[y][x+1]["left"]:
        return False
    return True
def venstre(y,x):
    if maze[y][x]["left"] or maze[y][x-1]["right"]:
        return False
    return True
def oppover(y,x):
    if maze[y][x]["top"] or maze[y-1][x]["bottom"]:
        return False
    return True

for y in range(len(maze)):
    for x in range(len(maze[y])):
        maze[y][x]["been"] = False



maze[0][0]["been"] = True
room = maze[0][0]
prevRoom = room
antallRom = 0
run = True
besokArr = [room]


while run:
    x, y = room["x"], room["y"]
    if x==499 and y==499:
        run = False
        
    if   y < 499 and not maze[y+1][x]["been"] and (nedover(y, x)):
        maze[y+1][x]["been"] = True
        room = maze[y+1][x]
        antallRom+=1
    elif x < 499 and not maze[y][x+1]["been"] and (hoyre(y, x)):
        maze[y][x+1]["been"] = True
        room = maze[y][x+1]
        antallRom+=1

    elif x > 0 and not maze[y][x-1]["been"] and (venstre(y, x)):
        maze[y][x-1]["been"] = True
        room = maze[y][x-1]
        antallRom+=1

    elif y > 0 and not maze[y-1][x]["been"] and (oppover(y, x)):
        maze[y-1][x]["been"] = True
        room = maze[y-1][x]
        antallRom+=1
    else:
        room = besokArr[besokArr.index(room)-1]
    besokArr.append(room)

print(antallRom, len(besokArr))



    




    


    
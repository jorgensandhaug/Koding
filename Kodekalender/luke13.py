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


stop = False
room = json.loads(json.dumps(maze[0][0]))
prevRoom = json.loads(json.dumps(room))
antallRom = 0


while (not stop):
    prevRoom = json.loads(json.dumps(room))
    [x, y] = [room["x"], room["y"]]
    if x==499 and y==499:
        stop = True
    if   not (maze[y+1][x]["been"])and (nedover(y, x)):
        room = json.loads(json.dumps(maze[y+1][x]))
    elif not (maze[y][x+1]["been"])and (hoyre(y, x)):
        room = json.loads(json.dumps(maze[y][x+1]))
    elif not (maze[y][x-1]["been"]) and (venstre(y, x)):
        room = json.loads(json.dumps(maze[y][x-1]))
    elif not (maze[y-1][x]["been"])and (oppover(y, x)):
        room = json.loads(json.dumps(maze[y-1][x]))
    else:
        maze[y][x]["been"] = True
        room = json.loads(json.dumps(prevRoom))
    if not maze[y][x]["been"]:
        antallRom+=1
        maze[y][x]["been"] = True
    print(room["x"], room["y"])
print(antallRom)

    




    


    
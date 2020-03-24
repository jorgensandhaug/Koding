from tkinter import *
from functools import partial
import random
import math



# funksjon som sørger henter input fra brukeren og sørger for at den ikke overstiger en gitt maksverdi
def inputValidation(msg, maxVal, defaultVal):
    try: 
        a = int(input(msg))
    except:
        return defaultVal

    if a > maxVal:
        a = inputValidation(msg, maxVal, defaultVal)
    return a

# får brukeren til å velge størrelse på brettet og setter variablene utifra det
width = inputValidation("Choose width of the game (max 50), press enter for default", 50, 12)
height = inputValidation("Choose height of the game (max 28), press enter for default", 28, 12)
antallMiner = inputValidation(f'Choose how many mines (max {width*height})', width*height, 15)


# velger scale utifra størrelsen på brettet
if height > 14 or width > 25:
    scale = 2
else:
    scale = 4




# initializer selve grafikk-programmet
root = Tk()

# antall markerte miner
mineCounter = 0

# arrayer som lagrer informasjonen om det synlige brettet (buttons) og
# det usynlige brettet (arena)
arena = []
buttons = []

# gjør at begge listene blir todimensjonale
for i in range(height):
    arena.append([])
    buttons.append([])

# fyller den arenaen med nuller
for i in arena:
    for k in range(width):
            i.append(0)

# plasserer det valgte antall miner randomly på brettet
counter = 0
while counter < antallMiner:
    y = math.floor(random.uniform(0, height))
    x = math.floor(random.uniform(0, width))
    if arena[y][x] == 0:
        arena[y][x] = "x"
        counter += 1

# funksjon som finner antall miner rundt en rute
def calcMines(x, y):
    num = 0
    for i in range(y-1, y+2):
        for j in range(x-1, x+2):
            if i >= 0 and i < height and j >= 0 and j < width and arena[i][j] == "x":
                num+=1
    return num


# sørger for at alle nullene blir gjort om til tall utifra hvor mange miner de har i nærheten
for y in range(height):
    for x in range(width):
        if arena[y][x] != "x":
            arena[y][x] = calcMines(x, y)



# en funksjon som kjøres dersom den åpnede ruta ikke har noen miner rundt
# da åpnes automatisk alle ruter rundt, og sjekker om de igjen har noen 
# miner rundt seg
def open(x, y):
    for i in range(y-1, y+2):
        for j in range(x-1, x+2):
            if (not(i==y and j==x)) and i >= 0 and i < height and j >= 0 and j < width and not isinstance(arena[i][j], str) and buttons[i][j]['text'] != "m":

                openButton(j, i)

                if arena[i][j] == "0":
                    open(j, i)



# funksjon som markerer åpnede ruter slik at de ikke kan bli forsøkt åpnet igjen
# forhindrer en evig loop i den rekursive open-funksjonen
def markAsOpened(x, y):
    arena[y][x] = str(arena[y][x])




# funksjon som åpner feltene rundt et tall dersom antall markerte miner rundt
# samsvarer med tallet
def openAround(x, y):
    miner = 0
    for i in range(y-1, y+2):
        for j in range(x-1, x+2):
            if (not(i==y and j==x)) and i >= 0 and i < height and j >= 0 and j < width and buttons[i][j]["text"] == "m":
                miner += 1
    tall = int(arena[y][x])
    if miner == tall:
        for i in range(y-1, y+2):
            for j in range(x-1, x+2):
                if i >= 0 and i < height and j >= 0 and j < width and buttons[i][j]["text"] == "" :
                    leftClick(j, i)



# funksjon som grafisk åpner ruter
def openButton(x, y):

        number = arena[y][x]
        if number == 0 or number == "0":
            number = "-"
        buttons[y][x] = Button(root, text = number, width = scale, height = int(scale/2))

        # legger til event for venstreklikk for de åpnede rutene
        if number != "-":
            buttons[y][x].bind('<Button-1>', lambda event, arg1=x, arg2=y : openAround(arg1, arg2))

        buttons[y][x].grid(row=y, column=x)
        markAsOpened(x, y)


# funksjonen som kjører når man venstreklikker på en rute
# åpner opp den ruta man trykker på, men hvis det er en mine så taper man spillet
# kan bare åpne dersom ruta ikke er markert
def leftClick(x, y):
    global root
    if buttons[y][x]['text'] != "m":
        if arena[y][x] != "x":
            openButton(x, y)

            if arena[y][x] == "0":
                open(x, y)

        elif arena[y][x] == "x":
            print("Du Tapte")

            #lager nytt vindu
            root.destroy()
            root = Tk()
            
            restartBtn = Button(root, text="You Lost \n \n Click to quit", width = 50, 
            height = 20, bg="red", fg="white", font=("Times New Roman", 12, "bold"), command=lambda: root.destroy())
            restartBtn.grid(row=0, column=0)


# funksjonen som kjører når man høyreklikker på en rute
# markerer ruta man trykker på eller tar bort markeringen
# det er meningen å markere der man tror det er miner, 
# og når en rute er markert med en "m", så går det ikke
# an å åpne den
def rightClick(x, y):
    global root
    global mineCounter
    if buttons[y][x]['text'] == "m":
        buttons[y][x]['text'] = ""
        mineCounter -= 1

    elif buttons[y][x]['text'] == "":
        buttons[y][x]['text'] = "m"
        mineCounter += 1

    if mineCounter == antallMiner:
        # sjekker også om alle de markerte minene er på riktig sted
        for y in range(height):
            for x in range(width):
                if buttons[y][x]["text"] == "m" and arena[y][x] != "x":
                    return False

        # hvis funksjonen kommer seg hit så har man klart å markere alle minene riktig
        # lager nytt vindu
        root.destroy()
        root = Tk()
        
        restartBtn = Button(root, text="You Won \n \n Click to quit", width = 50, 
        height = 20, bg="green", fg="white", font=("Times New Roman", 12, "bold"), command=lambda: root.destroy())
        restartBtn.grid(row=0, column=0)


# sørger for det grafiske i oppstarten av programmet
# tegner inn blanke ruter som man kan trykke på
def drawArena():
    for y in range(height):
        for x in range(width):
            buttons[y].append(Button(root, width = scale, height = int(scale/2), bg="#6699cc", fg="white"))

            # legger til events for høyre og venstreklikk for alle rutene
            buttons[y][x].bind('<Button-1>', lambda event, arg1=x, arg2=y : leftClick(arg1, arg2))
            buttons[y][x].bind('<Button-3>', lambda event, arg1=x, arg2=y : rightClick(arg1, arg2))
            buttons[y][x].grid(row=y, column=x)
            
drawArena()


#kjører selve grafikk-programmet ved kjøring av koden
root.mainloop()

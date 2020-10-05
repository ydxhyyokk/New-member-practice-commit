import pygame,random
from pygame.locals import *
pygame.init()
screen=pygame.display.set_mode((800,600))
t=pygame.time.Clock()
head1=[120,120]
body1=[[100,120],[80,120],[60,120]]
xiaoshe1="RIGHT"
foodx=random.randint(6,40)*20
foody=random.randint(6,30)*20
k1=0
score1=0
head2=[500,500]
body2=[[500,500],[480,500],[460,500]]
xiaoshe2="D"
k2=0
score2=0
def danmu(a,s,x,y,r,g,b):
    f=pygame.font.Font(None,s)
    b=f.render(a,True,(r,g,b))
    screen.blit(b,(x,y))
    pygame.display.update()
def hitwall1():
    global k1
    if head1[0]<=0 or head1[0]>=800:
        k1=1
    if head1[1]<=0 or head1[1]>=600:
        k1=1
def hitwall2():
    global k2
    if head2[0]>=800 or head2[0]<=0:
        k2=1
    if head2[1]>=600 or head2[1]<=0:
        k2=1
def hitself1():
    global k1
    if head1 in body1[1:]:
        k1=1
def hitself2():
    global k2
    if head2 in body2[1:]:
        k2=1
def playagain():
    global xiaoshe1
    global xiaoshe2
    global k1
    global k2
    global score1
    global score2
    global head1
    global head2
    global body1
    global body2
    xiaoshe1="RIGHT"
    xiaoshe2="D"
    k1=0
    k2=0
    score1=0
    score2=0
    head1=[120,120]
    body1=[[100,120],[80,120],[60,120]]  
    head2=[500,500]
    body2=[[500,500],[480,500],[460,500]]                   
while 1:
    t.tick(5)
    screen.fill((255,255,255))
    pygame.draw.circle(screen,(0,0,0),(foodx,foody),10)
    for one in body1:
        pygame.draw.circle(screen,(255,0,0),(one[0],one[1]),10) 
    for two in body2:
        pygame.draw.circle(screen,(0,0,255),(two[0],two[1]),10)
    for event in pygame.event.get():
        if event.type==KEYDOWN and event.key==K_UP:
            if xiaoshe1!="DOWN":
                xiaoshe1="UP"
        if event.type==KEYDOWN and event.key==K_DOWN:
            if xiaoshe1!="UP":
                xiaoshe1="DOWN"
        if event.type==KEYDOWN and event.key==K_LEFT:
            if xiaoshe1!="RIGHT":
                xiaoshe1="LEFT"
        if event.type==KEYDOWN and event.key==K_RIGHT:
            if xiaoshe1!="LEFT":
                xiaoshe1="RIGHT"
        if event.type==KEYDOWN and event.key==K_w:
            if xiaoshe2!="S":
                xiaoshe2="W"
        if event.type==KEYDOWN and event.key==K_s:
            if xiaoshe2!="W":
                xiaoshe2="S"
        if event.type==KEYDOWN and event.key==K_a:
            if xiaoshe2!="D":
                xiaoshe2="A"
        if event.type==KEYDOWN and event.key==K_d:
            if xiaoshe2!="A":
                xiaoshe2="D"
    if head1==[foodx,foody] or head2==[foodx,foody]:
        if head1==[foodx,foody]:
            body1.append([])
            score1+=1
        if head2==[foodx,foody]:
            body2.append([])
            score2+=1
        foodx=random.randint(6,35)*20
        foody=random.randint(6,25)*20
        pygame.draw.circle(screen,(0,0,0),(foodx,foody),10)  
    if xiaoshe1=="UP":
        head1[1]-=20
    if xiaoshe1=="DOWN":
        head1[1]+=20
    if xiaoshe1=="LEFT":
        head1[0]-=20
    if xiaoshe1=="RIGHT":
        head1[0]+=20
    if xiaoshe2=="W":
        head2[1]-=20
    if xiaoshe2=="S":
        head2[1]+=20
    if xiaoshe2=="A":
        head2[0]-=20
    if xiaoshe2=="D":
        head2[0]+=20
    danmu("PLAYER1",40,140,30,255,0,0)
    danmu("PLAYER2",40,500,30,0,0,255)
    danmu("Score:"+str(score1),40,150,70,255,0,0)
    danmu("Score:"+str(score2),40,510,70,0,0,255)   
    body1.insert(0,list(head1))
    body1.pop() 
    body2.insert(0,list(head2))
    body2.pop()
    pygame.display.update()
    hitwall1()
    hitself1()
    hitwall2()
    hitself2()
    for m in body1:
        for n in body2:
            if m==n:
                if len(body1)>len(body2):
                    k2=1
                if len(body2)>len(body1):
                    k1=1
                if len(body1)==len(body2):
                    pass
            else:
                pass
    if k1 or score1==20:
        danmu("PLAYER2 WINS!",60,250,300,0,0,0)
        while 1:
            event=pygame.event.poll()
            if event.type==QUIT:
                pygame.quit()
            if event.type==KEYDOWN and event.key==K_RETURN:
                playagain()
                break
    if k2 or score2==20:
        danmu("PLAYER1 WINS!",60,250,300,0,0,0)
        while 1:
            event=pygame.event.poll()
            if event.type==QUIT:
                pygame.quit()
            if event.type==KEYDOWN and event.key==K_RETURN:
                playagain()
                break
    pygame.display.update()


#include"bits/stdc++.h"
#define N 10002
using namespace std;
typedef struct _matrix
{
	bool matrix[N][N];
	struct _matrix *pre_step,*next_step;
	_matrix()
	{
		pre_step=next_step=NULL;
	}
	int _count(int x,int y)
	{
		int ret=0;
		for(int i=-1;i<=1;i++)
			for(int j=-1;j<=1;j++)
			{
				if(i==0&&j==0)
					continue;
				ret+=(int)matrix[x+i][y+j];
			}
		return ret;
	}
}MATRIX,*PMATRIX;
typedef struct _game
{
	PMATRIX head,tail;
	FILE *f;
	int cnt;
	int auto_save,save_cnt;
	_game(int a_s)
	{
		auto_save=a_s>=10?10:a_s;
		save_cnt=1;
		head=new MATRIX;
		tail=head;
		cnt=1;
	}
	void _save()
	{
		for(int i=1;i<=10000;i++)
			for(int j=1;j<=10000;j++)
				fprintf(f,"%c",head->matrix[i][j]?"1":"0");
	}
	void _delete()
	{
		PMATRIX del=tail;
		tail=tail->next_step;
		delete del;
		return ;
	}
	void _add()
	{
		PMATRIX add=new MATRIX;
		add->pre_step=head;
		head->next_step=add;
		head=add;
		cnt++;
		if(cnt>10)
		{
			_delete();
			cnt--;
		}
		return ;
	}
	void _next()
	{
		PMATRIX last;
		_add();
		save_cnt++;
		if(save_cnt>auto_save)
			_save();
		last=head->pre_step;
		for(int i=1;i<=10000;i++)
		{
			for(int j=1;j<=10000;j++)
			{
				switch(last->_count(i,j)) 
				{
					case 2:head->matrix[i][j]=last->matrix[i][j];break;
					case 3:head->matrix[i][j]=true;break;
					default:head->matrix[i][j]=false;break;
				}
			}
		}
	}
	void _next_for(int times)
	{
		PMATRIX last;
		_add();
		save_cnt++; 
		if(save_cnt>auto_save)
			_save();
		last=head->pre_step;
		for(int i=1;i<=10000;i++)
		{
			for(int j=1;j<=10000;j++)
			{
				switch(last->_count(i,j)) 
				{
					case 2:head->matrix[i][j]=last->matrix[i][j];break;
					case 3:head->matrix[i][j]=true;break;
					default:head->matrix[i][j]=false;break;
				}
			}
		}
		times--;
		for(int k=1;k<=times;k++)
			for(int i=1;i<=10000;i++)
				for(int j=1;j<=10000;j++)
					switch(head->_count(i,j)) 
					{
						case 2:head->matrix[i][j]=head->matrix[i][j];break;
						case 3:head->matrix[i][j]=true;break;
						default:head->matrix[i][j]=false;break;
					}
		return ;
	}
	void _look(int x,int y)
	{
		if(x<10)x=10;
		if(y<10)y=10; 
		for(int i=-10;i<=10;i++)
		{
			for(int j=-10;j<=10;j++)
				printf("%c",head->matrix[x+i][y+j]?"+":" ");
			printf("\n");
		}
		return ;
	}
	void back()
	{
		PMATRIX del=head;
		save_cnt++;
		if(save_cnt>auto_save)
			_save();
		head=head->pre_step;
		delete del;
		cnt--;
		return ;
	}
}GAME,*PGAME;
PGAME g;
void _init()
{
	printf("The game of life, invented by the English mathematician John Horton Conway(1937.1.26-2020.4.11).More information can be  found through the Internet.\n");
	printf("And this program is a small simulator of the game of life.\n");
	printf("The command of this simulator are followed:(The file names shall only contain : A-Z a-z 0-9 _ )\n");
	printf("   new XX       : start a new game\n");
	printf("   open XX      : open the game XX\n"); 
	printf("   save         : save the game\n");
	printf("   save_as XX   : save the game as XX\n"); 
	printf("   next         : make the game move forward for 1 unit of time\n");
	printf("   next_for XX  : make the game move forward for XX units of time\n");
	printf("   back         : revocate last command(only avaliable for the next and next_for command)\n");
	printf("   look X Y     : give you a look about the matrix from (X-10,Y-10) to (X+10,Y+10)\n");
	printf("   exit         : exit the whole program\n"); 
	printf("   save_exit    : save the game and then exit the whole program\n"); 
}
void _new(string url,int a_s)
{
	string tmp="./gamedata/"+url+".lgd";
	g=new GAME(a_s);
	g->f=fopen(tmp.c_str(),"wr");
}
void _open(string url,int a_s)
{
	string tmp="./gamedata/"+url+".lgd";
	g=new GAME(a_s);
	g->f=fopen(tmp.c_str(),"wr");
	for(int i=1;i<=10000;i++)
	{
		for(int j=1;j<=10000;j++)
		{
			int tmp;
			fscanf(g->f,"%d",&tmp);
			g->head->matrix[i][j]?1:0;
		}
	}
}
void _save()
{
	for(int i=1;i<=10000;i++)
		for(int j=1;j<=10000;j++)
			fprintf(g->f,"%c",g->head->matrix[i][j]?"1":"0");
}
void _save_as(string url)
{
	string tmp="./gamedata/"+url+".lgd";
	g->f=fopen(tmp.c_str(),"wr");
	for(int i=1;i<=10000;i++)
		for(int j=1;j<=10000;j++)
			fprintf(g->f,"%c",g->head->matrix[i][j]?"1":"0");
}
int main()
{
	_init();
	string cmd,url;
	int num,num2;
	while(1)
	{
		printf(">>");
		cin>>cmd;
		if(cmd=="new")
		{
			getchar();
			cin>>url;
			printf("How many steps would like to save once?\n  Steps:");
			scanf("%d",&num);
			_new(url,num);
		}
		if(cmd=="open")
		{
			getchar();
			cin>>url;
			printf("How many steps would like to save once?\n  Steps:");
			scanf("%d",&num);
			_open(url,num);
		}
		else if(cmd=="next")
			g->_next();
		else if(cmd=="back")
			g->back();
		else if(cmd=="next_for")
		{
			scanf("%d",&num);
			g->_next_for(num);
		}
		else if(cmd=="look")
		{
			scanf("%d%d",&num,&num2);
			g->_look(num,num2);
		}
		else if(cmd=="save")
			_save();
		else if(cmd=="save_as")
		{
			getchar();
			cin>>url;
			_save_as(url);
			break;
		}
		else if(cmd=="save_exit")
		{
			_save();
			break;
		}
		else if(cmd=="exit")
			break;
	}
	printf("Exit successfully!");
	return 0;
}

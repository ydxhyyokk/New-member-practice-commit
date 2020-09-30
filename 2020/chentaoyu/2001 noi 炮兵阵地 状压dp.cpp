#include<bits/stdc++.h>
using namespace std;
int num1[120],num[120][70],dp[120][70][70],soldier[120][70];
int n,m;
int k,h,ans,temp;
char s[20];
void hang(int i,int temp){
    int t=0,j,k,sum;
    for(j=0;j<(1<<m);j++){
        if(j&(j<<1)||(j&(j<<2))) continue;
        if(j&temp)continue;
        t++;num[i][t]=j;
        k=j;sum=0;
        while(k>0){
            if(k%2==1)sum++;
            k/=2;
        }
        soldier[i][t]=sum;
    }
    num1[i]=t;
}
int main()
{
	//freopen("soldier.in","r",stdin);
	//freopen("soldier.out","w",stdout);
	scanf("%d%d",&n,&m);
	memset(num1,0,sizeof(num1));
	memset(soldier,0,sizeof(soldier));
	memset(dp,0,sizeof(dp));
	memset(num,0,sizeof(num));
	for(int i=1;i<=n;i++){
		scanf("%s",s);
		temp=0;
			for(int j=0;j<m;j++){
				if(s[j]=='P')  temp*=2;
				else if(s[j]=='H')  temp=temp*2+1;
			}
			hang(i,temp);
	    }
		ans=0;
		for(int j=1;j<=num1[1];j++)  dp[1][j][0]=soldier[1][j];
		if(n==1){
			for(int j=1;j<=num1[1];j++)  ans=max(ans,dp[1][j][0]);
			printf("%d\n",ans); 
			return 0;
		}
	    ans=0;
	    for(int j=1;j<=num1[2];j++)
	      for(int k=1;k<=num1[1];k++){
	      	 if(num[2][j]&num[1][k])   continue;
	      	 dp[2][j][k]=soldier[2][j]+soldier[1][k];
	      	 ans=max(ans,dp[2][j][k]);
		  }
		if(n==2){printf("%d\n",ans);return 0;}
		ans=0;
		for(int i=3;i<=n;i++)  
		  for(int j=1;j<=num1[i];j++)
		    for(int k=1;k<=num1[i-1];k++){
		    	if(num[i][j]&num[i-1][k])  continue;
		    	    for(int h=1;h<=num1[i-2];h++){
                        if((num[i][j]&num[i-2][h])||(num[i-1][k]&num[i-2][h]))continue;
                        dp[i][j][k]=max(dp[i][j][k],dp[i-1][k][h]+soldier[i][j]);
                        ans=max(ans,dp[i][j][k]);
                    }
			}
	printf("%d\n",ans);     
	//fclose(stdin);
	//fclose(stdout);
	return 0;
}



















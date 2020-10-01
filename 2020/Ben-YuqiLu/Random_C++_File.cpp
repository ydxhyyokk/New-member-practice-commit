// PolymorphismDemo.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include <iostream>

int GetSize(int x)
{
	return x;
}

int GetSize(std::string x)
{
	return x.length();
}

class Animal
{
public:
	virtual void MakeNoise() {
		std::cout << "MakeNoise" << std::endl;
	}
};

class Dog : public Animal
{
public:
	void MakeNoise() override{
		std::cout << "Woof" << std::endl;
	}
};

class Cat : public Animal
{
public:
	void MakeNoise() override{
		std::cout << "Meow" << std::endl;
	}
};

void Stroke(Animal* animal) // pointers and references only, others won't work
{
	animal->MakeNoise();
}

int main()
{
	std::cout << GetSize(5) << std::endl;
	std::cout << GetSize("Hello World") << std::endl;
	Dog dog;
	Cat cat;
	Stroke(&cat);
	Stroke(&dog);
	
	std::cin.get();
	return 0;
}
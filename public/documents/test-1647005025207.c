#include<stdio.h>
#include<stdlib.h>
#include<math.h>

float canZ(int start, int end) {
    if(end == start + 1)
        return sqrt(start + sqrt(end));
    return start + canZ(start + 1, end);
}

int main() {
    printf("hello");
    printf("sum %f", canZ(3, 1));
    return 1;
}
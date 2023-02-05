
# Improving Blinky

## Register variable names

static const : “static const” is basically a combination of static(a storage specifier) and const(a type qualifier).

Static : determines the lifetime and visibility/accessibility of the variable. This means if a variable is declared as a static variable, it will remain in the memory the whole time when the program is running, while the normal or auto variables are destroyed when the function (where the variable was defined) is over.
Const : is a type qualifier. A type qualifier is used to express additional info about a value through type system. When a variable is initialized using the const type qualifier, it will not accept further change in its value.
So combining static and const, we can say that when a variable is initialized using static const, it will retain its value till the execution of the program and also, it will not accept any change in its value.

```cpp
volatile uint32_t* const RCC_AHB2ENR = (uint32_t*) (0x40021000 + 0x4C);
volatile uint32_t* const GPIOA_MODER = (uint32_t*) (0x48000000 + 0x00);
volatile uint32_t* const GPIOA_BSRR  = (uint32_t*) (0x48000000 + 0x18);
```

```cpp
*RCC_AHB2ENR |= 1;
```

```cpp
#include <stdint.h>

volatile uint32_t* const RCC_AHB2ENR = (uint32_t*) (0x40021000 + 0x4C);
volatile uint32_t* const GPIOA_MODER = (uint32_t*) (0x48000000 + 0x00);
volatile uint32_t* const GPIOA_BSRR  = (uint32_t*) (0x48000000 + 0x18);

void approx_wait(uint32_t milliseconds)
{
    for (uint32_t j = 0; j < milliseconds; j++)
    {
        for(volatile uint32_t i = 0; i < 80 * 1000 / 10; i++);
    }
}

int main() {
    //Green led of the NUCLEO-L476RG is connected to PA5
    //Enable GPIOA peripheral in the AHB2ENR: set bit 0
    *RCC_AHB2ENR |= 1;

    // GPIOA_MODER set GP output mode for PA5: reset bit 11 & set bit 10
    *GPIOA_MODER &= ~(1<<11);
    *GPIOA_MODER |= (1 << 10);

    while (true)
    {
        //GPIOA_BSRR set PA5: set bit 5
        *GPIOA_BSRR |= 1 << 5;
        approx_wait(500);
        //GPIOA_BSRR reset PA5: set bit 21
        *GPIOA_BSRR  |= 1 << 21;
        approx_wait(500);
    }
    return 0;
}
```

## CMSIS

```cpp
#include <stdint.h>
#include "stm32l476xx.h"

void approx_wait(uint32_t milliseconds)
{
    for (uint32_t j = 0; j < milliseconds; j++)
    {
        for(volatile uint32_t i = 0; i < 80 * 1000 / 10; i++);
    }
}

int main() {
    //Green led of the NUCLEO-L476RG is connected to PA5
    //Enable GPIOA peripheral in the AHB2ENR: set bit 0
    RCC->AHB2ENR |= 1;

    // GPIOA_MODER set GP output mode for PA5: reset bit 11 & set bit 10
    GPIOA->MODER &= ~(1<<11);
    GPIOA->MODER |= (1 << 10);

    while (true)
    {
        //GPIOA_BSRR set PA5: set bit 5
        GPIOA->BSRR |= 1 << 5;
        approx_wait(500);
        //GPIOA_BSRR reset PA5: set bit 21
        GPIOA->BSRR  |= 1 << 21;
        approx_wait(500);
    }
    return 0;
}
```

## Generic functions

```cpp
#include <stdint.h>
#include "stm32l476xx.h"

void approx_wait(uint32_t milliseconds)
{
    for (uint32_t j = 0; j < milliseconds; j++)
    {
        for(volatile uint32_t i = 0; i < 80 * 1000 / 10; i++);
    }
}

void setAsOutput(GPIO_TypeDef* port, uint8_t pin) {
    port->MODER &= ~(1 << ((2 * pin) + 1) );
    port->MODER |=  (1 << ((2 * pin) + 0) );
}

void init() {
    RCC->AHB2ENR |= 1;
    setAsOutput(GPIOA, 5);
}

void setBit(GPIO_TypeDef* port, uint8_t pin) {
    port->BSRR |= 1 << pin;
}

void clearBit(GPIO_TypeDef* port, uint8_t pin) {
    port->BSRR |= 1 << (pin + 16);
}

int main() {
    init();
    while (true)
    {
        setBit(GPIOA, 5);
        approx_wait(500);
        clearBit(GPIOA, 5);
        approx_wait(500);
    }
    return 0;
}
```

## Toggle led

```cpp
#include <stdint.h>
#include "stm32l476xx.h"

void approx_wait(uint32_t milliseconds)
{
    for (uint32_t j = 0; j < milliseconds; j++)
    {
        for(volatile uint32_t i = 0; i < 80 * 1000 / 10; i++);
    }
}

void setAsOutput(GPIO_TypeDef* port, uint8_t pin) {
    port->MODER &= ~(1 << ((2 * pin) + 1) );
    port->MODER |=  (1 << ((2 * pin) + 0) );
}

void init() {
    RCC->AHB2ENR |= 1;
    setAsOutput(GPIOA, 5);
}

int main() {
    init();
    while (true)
    {
        GPIOA->ODR ^= 1 << 5; 
        approx_wait(500);
    }
    return 0;
}
```

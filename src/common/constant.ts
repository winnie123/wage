let taxRates = {
    'shanghai' : [
        {
            'minAmount' : 0,
            'maxAmount' : 1499,
            'rate' : 0.03
        },
        {
            'minAmount' : 1500,
            'maxAmount' : 4499,
            'rate' : 0.1
        },
        {
            'minAmount' : 4500,
            'maxAmount' : 8999,
            'rate' : 0.2
        },
        {
            'minAmount' : 9000,
            'maxAmount' : 34999,
            'rate' : 0.25
        },
        {
            'minAmount' :35000,
            'maxAmount' : 54999,
            'rate' : 0.3
        },
        {
            'minAmount' : 55000,
            'maxAmount' : 79999,
            'rate' : 0.35
        },
        {
            'minAmount' : 80000,
            'rate' : 0.45
        },
    ]
}

export {
    taxRates
}
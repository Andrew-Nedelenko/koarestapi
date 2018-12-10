const root = async ctx => {
    ctx.body = [
        {
            a: 1
        },
        {
            b: 2
        },
        {
            c: 3
        }
    ]
}

const forbidden = async ctx => {
    ctx.status = 404
}

module.exports = {
    root,
    forbidden
}
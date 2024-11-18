export default {
    props: {
        errors: {
            type: [Array, String, null],
            required: false,
            default: () => [],
        },
    }
};

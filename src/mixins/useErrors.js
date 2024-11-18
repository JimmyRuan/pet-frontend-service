export default {
    props: {
        errors: {
            type: [Array, String],
            required: false,
            default: () => [],
        },
    }
};
